from flask import Flask, render_template, request, redirect
import sqlite3
import json

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row
    return conn

def create_table():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

create_table()

# HOME
@app.route('/')
def index():
    conn = get_db_connection()
    expenses = conn.execute('SELECT * FROM expenses').fetchall()
    total = conn.execute('SELECT SUM(amount) FROM expenses').fetchone()[0]

    # Category-wise data for chart
    data = conn.execute('SELECT category, SUM(amount) as total FROM expenses GROUP BY category').fetchall()
    conn.close()

    categories = [row['category'] for row in data]
    amounts = [row['total'] for row in data]

    return render_template('index.html',
                           expenses=expenses,
                           total=total,
                           categories=json.dumps(categories),
                           amounts=json.dumps(amounts))

# ADD
@app.route('/add', methods=('GET', 'POST'))
def add():
    if request.method == 'POST':
        title = request.form['title']
        amount = request.form['amount']
        category = request.form['category']

        conn = get_db_connection()
        conn.execute('INSERT INTO expenses (title, amount, category) VALUES (?, ?, ?)',
                     (title, amount, category))
        conn.commit()
        conn.close()

        return redirect('/')

    return render_template('add.html')

# EDIT
@app.route('/edit/<int:id>', methods=('GET', 'POST'))
def edit(id):
    conn = get_db_connection()
    expense = conn.execute('SELECT * FROM expenses WHERE id=?', (id,)).fetchone()

    if request.method == 'POST':
        title = request.form['title']
        amount = request.form['amount']
        category = request.form['category']

        conn.execute('UPDATE expenses SET title=?, amount=?, category=? WHERE id=?',
                     (title, amount, category, id))
        conn.commit()
        conn.close()
        return redirect('/')

    conn.close()
    return render_template('edit.html', expense=expense)

# DELETE
@app.route('/delete/<int:id>')
def delete(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM expenses WHERE id=?', (id,))
    conn.commit()
    conn.close()
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)