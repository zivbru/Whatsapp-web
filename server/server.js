const io = require('socket.io')(5000, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin'],
    credentials: true,
  },
});

io.on('connect', (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((rec) => {
      const newRecipients = recipients.filter((r) => r !== rec);
      newRecipients.push(id);
      socket.broadcast.to(rec).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});
