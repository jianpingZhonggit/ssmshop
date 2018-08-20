package org.heida.model;

import java.util.LinkedList;

/**
 * 购物车对象
 */
public class Cart {
    /**
     *购物项集合
     */
    private LinkedList<CartItem> cartItems;

    /**
     *获得购物项列表集合
     * @return 购物项列表集合
     */
    public LinkedList<CartItem> getCartItems() {
        return cartItems;
    }

    /**
     * 设置购物项列表集合
     * @param cartItems 购物项列表集合
     */
    public void setCartItems(LinkedList<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    /**
     * 根据购物项计算总价
     * @return 购物项总价
     */
    public Double getTotal(){
        Double total = 0.0;
        for (int i = 0; i < cartItems.size(); i++) {
            total += cartItems.get(i).getSubTotal();
        }
        return total;
    }
}
