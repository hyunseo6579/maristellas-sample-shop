# Maristella's Sample Shop: Ecommerce Website (Django + React)

Live website: https://maristellas.herokuapp.com/#/

This project was based on Udemy tutorial: https://www.udemy.com/course/django-with-react-an-ecommerce-website/
Along with Django and React, the website uses AWS for storing data and Heroku for deployment.

The purpose of this website was to create a sample ecommerce website for a client who releases items for sale on biweekly basis.
Hence, this project involved modifying the tutorial's website to be more appropriate for this client's business.

![SampleHome](https://github.com/hyunseo6579/maristellas-sample-shop/blob/master/resources/SampleHome.png)

# Features
- Released product's carousel
- Shopping cart for released products
- Product description page for current and past releases
- Admin product management
- Admin user management
- Admin order detail management
- Checkout process
- Registration and login process
- Customer profile page with order details
- Admin's option to mark order delivered
- Customer's option to mark order as paid (etransfer)

# Setup Instructions
1. Clone the project
2. `cd maristellas-sample-shop`
3. Create virtual environment with: `virtualenv [venv name]`
4. `[venv name]\Scripts\activate`
5. `pip install -r requirements.txt`
6. `cd frontend`
7. `npm install`
8. `cd ../backend`
9. `python manage.py runserver`
