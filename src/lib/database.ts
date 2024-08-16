// src/database.ts
import sqlite3 from 'sqlite3';
import path from 'path';
import { randomUUID } from 'crypto';

// Configura o banco de dados SQLite
const dbPath = path.resolve(__dirname, 'test.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Interface para um usuário
export interface User {
  id: string;
  nome: string;
  email: string;
  administrador: boolean;
  data_nascimento: string;
  created_at: string;
  password_hash:string
}

// Interface para o resultado de uma consulta de usuário
interface UserRow {
  id: string;
  nome: string;
  email: string;
  data_nascimento: string;
  administrador: boolean;
  created_at: string;
  password_hash: string
}

// Função para selecionar todos os usuários
export const getAllUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT id, nome, email, administrador, data_nascimento, created_at FROM users', (err, rows: User[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Função para adicionar um novo usuário
export const addUser = (nome: string, email: string, passwordHash: string, datanascimento: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO users (id, nome, email, password_hash, data_nascimento) VALUES (?, ?, ?, ?, ?)');

        const id = randomUUID();

        stmt.run(id, nome, email, passwordHash, datanascimento, function (this: sqlite3.RunResult, err: Error | null) {
            if (err) {
                reject(err);
            } else {
                // Consulta para obter o usuário recém-adicionado com todos os campos
                db.get('SELECT id, nome, email, administrador, data_nascimento, created_at FROM users WHERE id = ?', [id], (err: Error | null, row: UserRow) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: row.id,
                            nome: row.nome,
                            email: row.email,
                            administrador: row.administrador ? true:false,
                            data_nascimento: row.data_nascimento,
                            created_at: row.created_at,
                            password_hash:''
                        });
                    }
                });
            }
        });
    });
};
// Função para buscar um usuário por email
export const getUserByEmail = (email: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT id, nome, email, password_hash FROM users WHERE email = ?', [email], (err: Error | null, row: UserRow) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    resolve({
                        id: row.id,
                        nome: row.nome,
                        email: row.email,
                        administrador: row.administrador ? true:false,
                        data_nascimento: row.data_nascimento,
                        created_at: row.created_at,
                        password_hash: row.password_hash
                    });
                } else {
                    resolve(null);  // Retorna null se não encontrar nenhum usuário
                }
            }
        });
    });
};

// Função para buscar um usuário por id
export const getUserById = (id: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT id, nome, email, password_hash, administrador, data_nascimento, password_hash, created_at FROM users WHERE id = ?', [id], (err: Error | null, row: UserRow) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    resolve({
                        id: row.id,
                        nome: row.nome,
                        email: row.email,
                        administrador: row.administrador ? true:false,
                        data_nascimento: row.data_nascimento,
                        created_at: row.created_at,
                        password_hash: row.password_hash
                    });
                } else {
                    resolve(null);  // Retorna null se não encontrar nenhum usuário
                }
            }
        });
    });
};


// Função para atualizar o password_hash por id
export const updatePasswordById = (id: string, password: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE users SET password_hash = ? WHERE id = ?');

        stmt.run(password, id, function (this: sqlite3.RunResult, err: Error | null) {
            if (err) {
                reject(err);
            } else {
                // Consulta para obter o usuário recém-adicionado com todos os campos
                db.get('SELECT id, nome, email, administrador, data_nascimento, created_at FROM users WHERE id = ?', [id], (err: Error | null, row: UserRow) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: row.id,
                            nome: row.nome,
                            email: row.email,
                            administrador: row.administrador ? true:false,
                            data_nascimento: row.data_nascimento,
                            created_at: row.created_at,
                            password_hash:''
                        });
                    }
                });
            }
        });
    });
};

// Fechar o banco de dados (opcional)
export const closeDatabase = (): void => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar o banco de dados:', err.message);
        } else {
            console.log('Banco de dados fechado.');
        }
    });
};
