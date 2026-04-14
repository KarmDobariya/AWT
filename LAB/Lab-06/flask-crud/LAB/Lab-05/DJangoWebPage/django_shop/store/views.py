from django.shortcuts import render, redirect

products = [
    {"id": 1, "name": "Wireless Mouse", "price": 25},
    {"id": 2, "name": "Mechanical Keyboard", "price": 80},
    {"id": 3, "name": "Gaming Monitor", "price": 300},
    {"id": 4, "name": "USB-C Hub", "price": 40},
    {"id": 5, "name": "Bluetooth Headphones", "price": 120},
    {"id": 6, "name": "Laptop Stand", "price": 35}
]

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        if username:
            request.session['is_logged_in'] = True
            request.session['username'] = username
            request.session['cart'] = []
            return redirect('home')
    return render(request, 'store/login.html')

def logout_view(request):
    request.session.flush()
    return redirect('login')

def home_view(request):
    if not request.session.get('is_logged_in'):
        return redirect('login')
    
    cart = request.session.get('cart', [])
    total_amount = sum(item['price'] for item in cart)
    
    return render(request, 'store/home.html', {
        'username': request.session.get('username'),
        'products': products,
        'cart': cart,
        'total_amount': total_amount
    })

def add_to_cart(request, product_id):
    if not request.session.get('is_logged_in'):
        return redirect('login')
        
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        cart = request.session.get('cart', [])
        cart.append(product)
        request.session['cart'] = cart
        
    return redirect('home')

def remove_from_cart(request, index):
    if not request.session.get('is_logged_in'):
        return redirect('login')
        
    cart = request.session.get('cart', [])
    if 0 <= index < len(cart):
        cart.pop(index)
        request.session['cart'] = cart
        
    return redirect('home')

def payment_view(request):
    if not request.session.get('is_logged_in'):
        return redirect('login')
    cart = request.session.get('cart', [])
    if not cart:
        return redirect('home')
    total_amount = sum(item['price'] for item in cart)
    return render(request, 'store/payment.html', {'total_amount': total_amount})

def order_success_view(request):
    if not request.session.get('is_logged_in'):
        return redirect('login')
    request.session['cart'] = []
    return render(request, 'store/success.html')