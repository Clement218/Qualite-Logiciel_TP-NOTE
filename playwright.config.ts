import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
});

dotenv.config({path: path.resolve(__dirname, 'env/.env')});