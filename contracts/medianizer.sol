pragma solidity ^0.4.23;

import "./value.sol";

contract Medianizer is DSThing {
    event LogValue(bytes32 val);
    event LogPeek(address indexed caller, uint blockNumber, bytes32 val, bool flag);

    uint128 val;
    bool public has;

    mapping (bytes12 => address) public values;
    mapping (address => bytes12) public indexes;
    bytes12 public next = 0x1;
    uint96 public min = 0x1;

    function set(address wat) public auth {
        bytes12 nextId = bytes12(uint96(next) + 1);
        require(nextId != 0x0);
        this.set(next, wat);
        next = nextId;
    }

    function set(bytes12 pos, address wat) public note auth {
        require(pos != 0x0);
        require(wat == 0 || indexes[wat] == 0);

        indexes[values[pos]] = 0x0; // Making sure to remove a possible existing address in that position

        if (wat != 0) {
            indexes[wat] = pos;
        }

        values[pos] = wat;
    }

    function setMin(uint96 min_) public note auth {
        require(min_ != 0x0);
        min = min_;
    }

    function setNext(bytes12 next_) public note auth {
        require(next_ != 0x0);
        next = next_;
    }

    function unset(bytes12 pos) public auth {
        this.set(pos, 0);
    }

    function unset(address wat) public auth {
        this.set(indexes[wat], 0);
    }

    function void() external auth {
        has = false;
        // TODO: don't allow poke
    }

    function poke() external {
        (bytes32 val_, bool has_) = compute();
        val = uint128(val_);
        has = has_;
        emit LogValue(val_);
    }

    function peek() external view returns (bytes32, bool) {
        return (bytes32(val), has);
    }

    function read() external view returns (bytes32) {
        require(has);
        return bytes32(val);
    }

    function compute() public view returns (bytes32, bool) {
        bytes32[] memory wuts = new bytes32[](uint96(next) - 1);
        uint96 ctr = 0;
        for (uint96 i = 1; i < uint96(next); i++) {
            if (values[bytes12(i)] != 0) {
                bytes32 wut;
                bool wuz;
                (wut, wuz) = DSValue(values[bytes12(i)]).peek();
                if (wuz) {
                    if (ctr == 0 || wut >= wuts[ctr - 1]) {
                        wuts[ctr] = wut;
                    } else {
                        uint96 j = 0;
                        while (wut >= wuts[j]) {
                            j++;
                        }
                        for (uint96 k = ctr; k > j; k--) {
                            wuts[k] = wuts[k - 1];
                        }
                        wuts[j] = wut;
                    }
                    ctr++;
                }
            }
        }

        if (ctr < min) {
            return (bytes32(val), false);
        }

        bytes32 value;
        if (ctr % 2 == 0) {
            uint128 val1 = uint128(wuts[(ctr / 2) - 1]);
            uint128 val2 = uint128(wuts[ctr / 2]);
            value = bytes32(wdiv(add(val1, val2), 2 trx));
        } else {
            value = wuts[(ctr - 1) / 2];
        }

        return (value, true);
    }

}