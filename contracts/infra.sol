/// tub.sol -- simplified CDP engine (baby brother of `vat')

// Copyright (C) 2017  Nikolai Mushegian <nikolai@dapphub.com>


pragma solidity ^0.4.18;

import "./thing.sol";
import "./token.sol";


contract PerFeed is DSThing {

    DSToken  public  skr;  // Abstracted collateral
    ERC20    public  gem;  // Underlying collateral

    event LogPer(uint ray);

    function pie() public view returns (uint) {
        return gem.balanceOf(this);
    }

    function PerFeed(
        DSToken  skr_,
        ERC20    gem_
    ) public {
        gem = gem_;
        skr = skr_;
    }

    function per() public  returns (uint ray) {
        LogPer(skr.totalSupply() == 0 ? RAY : rdiv(pie(), skr.totalSupply()));
        return skr.totalSupply() == 0 ? RAY : rdiv(pie(), skr.totalSupply());
    }

}
