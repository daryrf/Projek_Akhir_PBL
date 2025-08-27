let messages = []; // Sementara simpan di memori (nanti ganti ke MongoDB)

exports.sendMessage = (req, res) => {
  const { name, email, subject, message } = req.body;

  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    date: new Date().toISOString(),
  };

  messages.push(newMessage);

  console.log("Pesan diterima:", newMessage);
  res.status(201).json({ message: "Pesan berhasil dikirim!" });
};

// Optional: GET untuk admin lihat pesan
exports.getAllMessages = (req, res) => {
  res.json(messages);
};