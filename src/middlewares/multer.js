import multer from 'multer';
import { TEMP_UPDLOAD_DIR } from '../constants/index.js';
import { nanoid } from 'nanoid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPDLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = nanoid();
    cb(null, uniquePrefix + '-' + file.originalname);
  },
});

export const upload = multer({ storage: storage });
