function setUpWebsocket(context) {
  context.setState({ws: new WebSocket('ws://elegant-saucisson-63110.herokuapp.com/ws')});
  var ws = context.state.ws;
  ws.onopen = () => {
    ws.send("Champ " + context.props.title)
  };
  ws.onmessage = (e) => {
    context.addRow(e.data, false);
  };
  ws.onerror = (e) => { };
  ws.onclose = (e) => { };
}

module.exports = setUpWebsocket;
