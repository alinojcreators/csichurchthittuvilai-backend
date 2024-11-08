require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Media = require('./models/media');
const memberRoutes = require('./routes/memberRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/csichurchthittuvilai';

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage }).fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]);

// Routes
app.use('/api/members', memberRoutes);
app.use('/api/users', userRoutes);

// Upload Media Route
app.post('/api/media/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(500).json({ error: 'File upload failed due to an unknown error.' });
    }

    try {
      const files = req.files;
      const metadata = JSON.parse(req.body.metadata);

      if (!metadata) {
        return res.status(400).json({ error: 'File metadata is required.' });
      }

      // Validate files
      if (!files.image && !files.video) {
        return res.status(400).json({ error: 'No files uploaded. Please upload an image or video.' });
      }

      const media = new Media({
        title: metadata.title,
        description: metadata.description,
        category: metadata.category,
        date: metadata.date,
        filePath: files.image ? files.image[0].path : files.video[0].path,
        fileType: files.image ? 'image' : 'video',
        createdAt: new Date(),
      });

      await media.save();
      res.status(200).json({ message: 'File uploaded successfully', media });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save file metadata.' });
    }
  });
});

// Fetch All Media Route
app.get('/api/media', async (req, res) => {
  try {
    const mediaItems = await Media.find();
    res.status(200).json(mediaItems);
  } catch (error) {
    console.error('Error fetching media items:', error);
    res.status(500).json({ error: 'Failed to fetch media items.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
