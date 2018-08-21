package org.heida.service.impl;

import org.heida.model.Cart;
import org.heida.model.CartItem;
import org.heida.model.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {
    /**
     * 根据商品id删除购物车中的购物项
     * @param cart 购物车对象
     * @param pid 商品id
     */
    void delCartItem(Cart cart, Integer pid);

    /**
     * 获得一级类目列表
     * @return 一级类目列表集合
     */
    List<Category> getCategoryList();

    /**
     * 根据购物车页面选中的购物项,将已选购物项封装,并从购物车中移除
     * @param checked 已选购物项的商品的id集合
     * @param count 所有购物车中购物项商品的数量集合
     * @param cart 购物车
     * @return 勾选购物项的列表集合
     */
    List<CartItem> shop(String[] checked,Integer[] count, Cart cart);

    Integer dealShop(List<CartItem> shop,Integer uid);

    Double getTotal(List<CartItem> shop);

}
