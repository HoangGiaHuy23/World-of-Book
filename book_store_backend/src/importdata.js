const mongoose = require('mongoose');
const fs = require('fs');

// Đường dẫn tới file JSON
const filePath = 'wards.json';

// Đọc dữ liệu từ file JSON
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Lỗi khi đọc file JSON:', err);
    return;
  }
  
  const jsonData = JSON.parse(data);

  // URL kết nối tới MongoDB
  const url = 'mongodb+srv://bookstore:bookstore2152@cluster0.g0k6smb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  // Kết nối tới MongoDB sử dụng mongoose
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Kết nối tới MongoDB thành công!');
      
      // Định nghĩa schema và model
      const Schema = mongoose.Schema;
      const dataSchema = new Schema({}, { strict: false });
      const DataModel = mongoose.model('wards', dataSchema);

      // Nhập dữ liệu vào bộ sưu tập
      if (Array.isArray(jsonData)) {
        DataModel.insertMany(jsonData)
          .then((result) => {
            console.log('Nhập dữ liệu thành công!', result.length, 'tài liệu đã được chèn.');
            mongoose.connection.close();
          })
          .catch((err) => {
            console.error('Lỗi khi nhập dữ liệu:', err);
            mongoose.connection.close();
          });
      } else {
        DataModel.create(jsonData)
          .then((result) => {
            console.log('Nhập dữ liệu thành công!', result._id, 'tài liệu đã được chèn.');
            mongoose.connection.close();
          })
          .catch((err) => {
            console.error('Lỗi khi nhập dữ liệu:', err);
            mongoose.connection.close();
          });
      }
    })
    .catch((err) => {
      console.error('Lỗi khi kết nối tới MongoDB:', err);
    });
});
