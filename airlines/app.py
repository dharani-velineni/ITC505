from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Email, Length

# Initialize Flask app and database
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # SQLite database for simplicity
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Initialize Flask-Login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'signin'

# User model for the database
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

# Create a form for the signin page
class LoginForm(FlaskForm):
    email = StringField('Email', validators=[InputRequired(), Email()])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8)])
    submit = SubmitField('Login')

# Create a form for the signup page
class SignUpForm(FlaskForm):
    email = StringField('Email', validators=[InputRequired(), Email()])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8)])
    submit = SubmitField('Sign Up')

# Route to handle the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle the signup page
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignUpForm()
    if form.validate_on_submit():
        email = form.email.data
        password = generate_password_hash(form.password.data, method='pbkdf2:sha256')
        new_user = User(email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        flash('Account created successfully!', 'success')
        return redirect(url_for('signin'))
    return render_template('signup.html', form=form)

# Route to handle the signin page
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('home'))  # Redirect to home after login
        flash('Invalid credentials, please try again.', 'danger')
    return render_template('signin.html', form=form)

# Route for the homepage (after login)
@app.route('/home')
@login_required
def home():
    return render_template('home.html')

# Profile page (only accessible to logged-in users)
@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html')

# Logout route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('signin'))

# Load user for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Flight Search Page
@app.route('/flights', methods=['GET', 'POST'])
@login_required
def flights():
    flights = [
        {"id": 1, "from": "New York", "to": "Los Angeles", "price": "$300"},
        {"id": 2, "from": "Chicago", "to": "San Francisco", "price": "$250"},
        {"id": 3, "from": "Miami", "to": "Boston", "price": "$200"}
    ]
    return render_template('flights.html', flights=flights)

# Booking Flight (POST route to book)
@app.route('/book/<int:flight_id>', methods=['POST'])
@login_required
def book(flight_id):
    # Here you would implement booking logic
    flight = {"id": flight_id, "from": "New York", "to": "Los Angeles", "price": "$300"}
    flash(f"Flight from {flight['from']} to {flight['to']} has been booked!", 'success')
    return redirect(url_for('payment', flight_id=flight_id))

# Payment Page
@app.route('/payment/<int:flight_id>', methods=['GET', 'POST'])
@login_required
def payment(flight_id):
    # Dummy flight data for payment
    flight = {"id": flight_id, "from": "New York", "to": "Los Angeles", "price": "$300"}
    
    if request.method == 'POST':
        # Process the payment logic (e.g., integrate with a payment gateway)
        flash(f"Payment successful for flight from {flight['from']} to {flight['to']}!", 'success')
        return redirect(url_for('home'))
    
    return render_template('payment.html', flight=flight)

# Contact Page
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Handle contact form submission
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        # Here, you would typically save the contact info to a database or send an email
        flash('Your message has been sent!', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')

# Run the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create the database tables
    app.run(debug=True)
