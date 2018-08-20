package org.heida.service.impl.impl;

import org.heida.model.Cart;
import org.heida.model.CartItem;
import org.heida.model.Category;
import org.heida.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    /**
     * 一级类目Service
     */
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private OrderService orderService;

    /**
     * 由购物车获得购物项列表集合,遍历购物项集合,
     * 删除购物项列表中商品id等于pid的购物项
     * @param cart 购物车对象
     * @param pid 商品id
     */
    @Override
    public void delCartItem(Cart cart, Integer pid) {
        LinkedList<CartItem> cartItems = cart.getCartItems();
        for (int i = 0; i < cartItems.size(); i++) {
            if(pid.equals(cartItems.get(i).getProduct().getPid())){
                cartItems.remove(i);
                break;
            }
        }
    }

    /**
     * 调用categoryService的getCategoryList方法
     * 获得一级类目列表集合
     * @return 一级类目列表集合
     */
    @Override
    public List<Category> getCategoryList() {
        return categoryService.getCategoryList();
    }

    /**
     * 遍历勾选列表(即已勾选的商品的id集合),在购物项中查找购物项
     * 商品id等于勾选列表中的id,将该购物项加入新的购物项列表集合中,并
     * 从购物车购物项列表集合中移除该项
     * @param checked 已选购物项的商品的id集合
     * @param count 所有购物车中购物项商品的数量集合
     * @param cart 购物车
     * @return 已勾选购物项列表集合
     */
    @Override
    public List<CartItem> shop(String[] checked, Integer[] count, Cart cart) {
        if(checked==null){
            return null;
        }else{
            List<CartItem> shop = new LinkedList<CartItem>();
            LinkedList<CartItem> cartItems = cart.getCartItems();
            for (int i = 0; i < checked.length; i++) {
                Integer checkedPid = Integer.valueOf(checked[i]);
                for (int j = 0; j < cartItems.size(); j++) {
                    if(checkedPid.equals(cartItems.get(j).getProduct().getPid())){
                                shop.add(cartItems.get(j));
                                cartItems.remove(j);
                                break;
                    }
                }
            }
            return shop;
        }
    }

    @Override
    public Integer dealShop(List<CartItem> shop,Integer uid) {
        Double total = 0.0;
        for (int i = 0; i < shop.size(); i++) {
            total += shop.get(i).getSubTotal();
        }
        Integer oid = orderService.makeOrder(total,uid);
        orderItemService.addOrderItems(shop,oid);
        return oid;
    }

    @Override
    public Double getTotal(List<CartItem> shop) {
        Double total = 0.0;
        for (int i = 0; i < shop.size(); i++) {
            total += shop.get(i).getSubTotal();
        }
        return total;
    }
}
