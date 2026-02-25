from .models import Cart, CartItem

def cart_count(request):
    try:
        if request.user.is_authenticated:
            return {"cart_count": 0}
        return {"cart_count": 0}
    except Exception:
        return {"cart_count": 0}