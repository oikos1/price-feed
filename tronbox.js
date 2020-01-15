const port = process.env.HOST_PORT || 9090

module.exports = {
  networks: {

    development: {
      // For trontools/quickstart docker image
      from: 'TRtNpmW7WMgzvAxiudYaF1JnxXxrKfMHM4',     
      privateKey: '3a2a995da90fcda21c210def6ff1edeaa8cddc9520b9c381ae931e6de5946245',
      fullHost: 'http://192.168.0.102:' + port,
      network_id: '*',
      userFeePercentage: 100, // or consume_user_resource_percent
      feeLimit: 100000000, // or fee_limit
      originEnergyLimit: 10000000, // or origin_energy_limit
      callValue: 0, // or call_value
      network_id: "*"      
    },
    compilers: {
      solc: {
         version: '0.4.24'
      }
    }
  }
}
