from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import sqlite3

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# === 1. BAZA YARATISH ===
def create_table():
    conn = sqlite3.connect('books.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS books
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title TEXT NOT NULL,
                  author TEXT NOT NULL,
                  price REAL NOT NULL)''')
    conn.commit()
    conn.close()

create_table()

# === 2. Barcha kitoblarni olish (GET) ===
@app.route('/api/books', methods=['GET'])
def get_books():
    conn = sqlite3.connect('books.db')
    c = conn.cursor()
    c.execute('SELECT * FROM books')
    rows = c.fetchall()
    conn.close()

    books = []
    for row in rows:
        books.append({
            'id': row[0],
            'title': row[1],
            'author': row[2],
            'price': row[3]
        })
    return jsonify(books)

# === 3. Yangi kitob qo‘shish (POST) ===
@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.get_json()
    title = data.get('title')
    author = data.get('author')
    price = data.get('price')

    conn = sqlite3.connect('books.db')
    c = conn.cursor()
    c.execute('INSERT INTO books (title, author, price) VALUES (?, ?, ?)',
              (title, author, price))
    conn.commit()
    conn.close()

    # WebSocket orqali xabar yuboramiz
    socketio.emit('new_book', {'title': title, 'author': author, 'price': price})

    return jsonify({'message': 'Kitob muvaffaqiyatli qo‘shildi!'})

# === 4. WebSocket hodisa ===
@socketio.on('connect')
def handle_connect():
    print('📡 Mijoz ulandi')

@socketio.on('disconnect')
def handle_disconnect():
    print('❌ Mijoz uzildi')

# === 5. Serverni ishga tushirish ===
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
