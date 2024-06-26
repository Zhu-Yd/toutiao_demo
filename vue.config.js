module.exports = {
  devServer: {
    https: true // 启用HTTPS
    // 如果需要，可以指定key和cert文件路径，例如使用mkcert生成的证书
    // key: './path/to/server.key',
    // cert: './path/to/server.crt',
    // 如果使用了自签名证书，可能需要设置下面的配置以避免浏览器警告
    // https://webpack.js.org/configuration/dev-server/#devserverclientcertificatepassword
    // pfx: './path/to/server.pfx',
    // pfxPassphrase: 'your-passphrase',
  }
}
