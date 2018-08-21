package org.heida.service.impl.impl;

import org.heida.model.*;
import org.heida.service.impl.CategorySecondService;
import org.heida.service.impl.CategoryService;
import org.heida.service.impl.MainService;
import org.heida.service.impl.ProductService;
import org.heida.model.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class MainServiceImpl implements MainService {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ProductService productService;
    @Autowired
    private CategorySecondService categorySecondService;


    @Override
    public List<Category> getCategoryList() {
        return categoryService.getCategoryList();
    }

    @Override
    public PageBean<Product> getPageBean(PageBean<Product> pageBean) {
        PageBean<Product> pageBean1 = productService.getPageBean(pageBean);
        return pageBean1;
    }

    @Override
    public List<CategorySecond> getCategorySecondListByCid(Integer cid) {
        return categorySecondService.getCategorySecondListByCid(cid);
    }

    @Override
    public Product getProductByPid(Integer pid) {
        return productService.getProductByPid(pid);
    }

    @Override
    public List<Product> getHotProduct() {
        return productService.getHotProduct();
    }

    @Override
    public List<Product> getNewProduct() {
        return productService.getNewProduct();
    }

    @Override
    public Cart dealCart(Integer pid, Integer count, Object cart) {
        if(pid==null){
            if(cart==null){
                Cart newCart = new Cart();
                LinkedList<CartItem> cartItems = new LinkedList<CartItem>();
                newCart.setCartItems(cartItems);
                return newCart;
            }
            return (Cart) cart;
        }else{
            if(count<1){
                count = 1;
            }
            if(cart==null){
                Cart newCart = new Cart();
                LinkedList<CartItem> cartItems = new LinkedList<CartItem>();
                CartItem cartItem = new CartItem();
                cartItem.setCount(count);
                Product product = productService.getProductByPid(pid);
                cartItem.setProduct(product);
                cartItems.add(cartItem);
                newCart.setCartItems(cartItems);
                return newCart;
            }
            boolean index = true;
            LinkedList<CartItem> cartItems = ((Cart) cart).getCartItems();
            for (int i = 0; i < cartItems.size(); i++) {
                if(pid.equals(cartItems.get(i).getProduct().getPid())){
                    cartItems.get(i).setCount(cartItems.get(i).getCount()+count);
                    index = false;
                }
            }
            if(index){
                CartItem cartItem = new CartItem();
                cartItem.setCount(count);
                Product product = productService.getProductByPid(pid);
                cartItem.setProduct(product);
                cartItems.add(cartItem);
            }
            return (Cart)cart;
        }
    }
}
