// database.js

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('imageDB.db');

const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, imagePath TEXT)'
    );
  });
};

const saveImageToDatabase = async (imagePath) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO images (imagePath) VALUES (?)',
        [imagePath],
        (_, result) => {
          resolve(result.insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const loadImagesFromDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM images',
        [],
        (_, result) => {
          const images = [];
          for (let i = 0; i < result.rows.length; ++i) {
            images.push(result.rows.item(i).imagePath);
          }
          resolve(images);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


async function deleteAllImagesFromDatabase() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM images',
                [],
                (_, result) => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
}

const loadLatestImagesFromDatabase = async (limit) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM images ORDER BY id DESC LIMIT ?',
          [limit],
          (_, result) => {
            const images = [];
            for (let i = 0; i < result.rows.length; ++i) {
              images.push(result.rows.item(i).imagePath);
            }
            resolve(images);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  const deleteImageFromDatabase = async (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM images WHERE id = ?',
          [id],
          (_, result) => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  
  export { setupDatabase, saveImageToDatabase, loadImagesFromDatabase, deleteAllImagesFromDatabase, loadLatestImagesFromDatabase, deleteImageFromDatabase };
  
  
