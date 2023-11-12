```bash
npm install --save @nestjs/common rxjs

```

```js
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class FileStorageService {
  private readonly storagePath: string;

  constructor() {
    // Define the path where files will be stored
    // This could be externalized to configuration
    this.storagePath = join(__dirname, 'storage');
  }

  async writeFile(filename: string, data: Buffer | string): Promise<void> {
    try {
      const filePath = join(this.storagePath, filename);
      await fs.writeFile(filePath, data);
    } catch (error) {
      throw new Error(`Failed to write file: ${error.message}`);
    }
  }

  async readFile(filename: string): Promise<Buffer> {
    try {
      const filePath = join(this.storagePath, filename);
      return await fs.readFile(filePath);
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  async deleteFile(filename: string): Promise<void> {
    try {
      const filePath = join(this.storagePath, filename);
      await fs.unlink(filePath);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
}

```

```js
import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Post(':filename')
  async uploadFile(@Param('filename') filename: string, @Body() fileData: string) {
    await this.fileStorageService.writeFile(filename, fileData);
    return { message: 'File uploaded successfully.' };
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string): Promise<Buffer> {
    return this.fileStorageService.readFile(filename);
  }

  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string) {
    await this.fileStorageService.deleteFile(filename);
    return { message: 'File deleted successfully.' };
  }
}

```

```js
import { Injectable } from '@nestjs/common';
import { createWriteStream, createReadStream, unlink } from 'fs';
import { join } from 'path';
import { Stream } from 'stream';

@Injectable()
export class FileStorageService {
  private readonly storagePath: string;

  constructor() {
    // Define the path where files will be stored
    // This could be externalized to configuration
    this.storagePath = join(__dirname, 'storage');
  }

  // Use this method to write large files with streams
  async writeFileStream(filename: string, dataStream: Stream): Promise<void> {
    return new Promise((resolve, reject) => {
      const filePath = join(this.storagePath, filename);
      const writeStream = createWriteStream(filePath);

      dataStream.pipe(writeStream);

      writeStream.on('error', (error) => {
        reject(`Failed to write file: ${error.message}`);
      });

      writeStream.on('finish', () => {
        resolve();
      });
    });
  }

  // Use this method to read large files with streams
  readFileStream(filename: string): Stream {
    const filePath = join(this.storagePath, filename);
    return createReadStream(filePath);
  }

  // Existing deleteFile method can remain unchanged
  async deleteFile(filename: string): Promise<void> {
    try {
      const filePath = join(this.storagePath, filename);
      await unlink(filePath);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
}

```

```js
import { Controller, Post, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FileStorageService } from './file-storage.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Post(':filename')
  async uploadFile(@Param('filename') filename: string, @Req() req: Request) {
    await this.fileStorageService.writeFileStream(filename, req);
    return { message: 'File uploaded successfully.' };
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const fileStream = this.fileStorageService.readFileStream(filename);
    fileStream.pipe(res);
  }
}

```

When reading a file as a stream in Node.js, you can listen to certain events on the stream to know when the reading is complete or if any errors have occurred. Here are the key events:

'end' Event: Emitted when there is no more data to be read from the stream.

'error' Event: Emitted if there was an error receiving data.

'close' Event: (Not always emitted) Indicates that the underlying resource (like a file descriptor) has been closed. Not all streams will emit this event.

Here’s how you might handle these events:

```js
const fileStream = this.fileStorageService.readFileStream(filename);

fileStream.on('data', (chunk) => {
  // Process the chunk of data here
});

fileStream.on('end', () => {
  // No more data to read
  console.log('Finished reading the file.');
});

fileStream.on('error', (error) => {
  // Handle the error here
  console.error('Error reading the file:', error);
});

fileStream.on('close', () => {
  // Optional, as not all streams will emit this
  console.log('Stream has been destroyed and file descriptor closed.');
});
```

In the context of a NestJS controller, where you might be streaming the file directly to the response, you would usually not handle the 'data' event, as the pipe() method takes care of that. Instead, you would listen to 'end' and 'error' events to log information or handle errors. Here's an example:

```js
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileStorageService } from './file-storage.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const fileStream = this.fileStorageService.readFileStream(filename);

    fileStream.pipe(res);

    fileStream.on('end', () => {
      // The 'end' event indicates that all the data has been flushed to the response stream
      console.log('Finished streaming the file.');
    });

    fileStream.on('error', (error) => {
      // Handle the error by logging and sending an appropriate HTTP response
      console.error('Error streaming the file:', error);
      res.status(500).send('Error streaming the file');
    });
  }
}

```

You
how to handle the client possibly closing the connection before the stream is finished. Like aborting the file read or other cleanup, depending on the context.

When dealing with HTTP connections in Node.js, there's always a possibility that the client may close the connection before the server has finished sending the data. In such cases, you might want to abort the ongoing operations to free up resources. Here's how you can handle such a scenario in a NestJS controller:

```js
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileStorageService } from './file-storage.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const fileStream = this.fileStorageService.readFileStream(filename);

    // Pipe the readable stream to the response
    fileStream.pipe(res);

    // Listen for 'end' event to log when the stream is finished
    fileStream.on('end', () => {
      console.log('Finished streaming the file.');
    });

    // Handle stream errors (e.g., file not found)
    fileStream.on('error', (error) => {
      console.error('Stream error:', error);
      if (!res.headersSent) {
        res.status(500).send('Error streaming the file');
      }
    });

    // Handle client closing the connection
    req.on('close', () => {
      if (!fileStream.destroyed) {
        console.log('Client aborted the connection, stopping file stream...');
        fileStream.destroy(); // This will close the stream
      }
    });
  }
}

```

In this FilesController:

The fileStream.pipe(res) line starts streaming the file's data to the client.
If an 'error' event is emitted by the fileStream, the server logs the error and sends a 500 status code if the headers have not already been sent.
The req.on('close', ...) listener is set up to handle the scenario when the client aborts the connection. If the client aborts, it will destroy the stream to prevent any further reading from the file.
By calling fileStream.destroy(), you're cleaning up the file read stream. This is particularly important to prevent memory leaks and to ensure that file descriptors are not left open, which could eventually lead to running out of file descriptors in your operating system.

Also, note that we check !fileStream.destroyed before calling destroy() to ensure we don't call it on an already closed stream, and !res.headersSent to prevent sending a response if headers have already been sent.
