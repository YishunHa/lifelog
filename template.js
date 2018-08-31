export default ({ markup, css }) => {
  return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Lifelogging System</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        </head>
        <body style="margin:0">
          <div id="root">${markup}</div>
          <style id="jss-server-side">${css}</style>
          <script type="text/javascript" src="/dist/bundle.js"></script>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzQNpK8OSEwzED8BFCUenPoMRdfBOKtHY&libraries=places&callback" async></script>

        </body>
      </html>`;
};
