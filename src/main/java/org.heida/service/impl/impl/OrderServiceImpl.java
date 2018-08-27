package org.heida.service.impl.impl;

import org.heida.dao.OrderDao;
import org.heida.model.*;
import org.heida.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private final Integer pageSize = 9;
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private OrderItemService orderItemService;
    @Autowired
    private ProductService productService;
    @Autowired
    private CartService cartService;

    @Override
    public Integer makeOrder(Double total,Integer uid) {
        Order order = new Order();
        order.setTotal(total);
        order.setState(1);
        order.setOrdertime(new Date());
        order.setUid(uid);
        orderDao.insertOrder(order);
        Integer oid = order.getOid();
        return oid;
    }

    @Override
    public List<Category> getCategoryList() {
        return categoryService.getCategoryList();
    }

    @Override
    public List<OrderExt> getOrderList(String state, Integer uid) {
        Order order = new Order();
        order.setUid(uid);
        if(state==null){
            order.setState(null);
        }else{
            order.setState(Integer.valueOf(state));
        }
        return orderDao.getOrderList(order);
    }

    @Override
    public PageBeanExt getPageBeanExt(PageBeanExt pageBeanExt) {
        if(pageBeanExt.getPageNow()==null){
            pageBeanExt.setPageNow(1);
        }
        pageBeanExt.setPageSize(pageSize);
        pageBeanExt.setRowCount(orderDao.getRowCount(pageBeanExt));
        if(pageBeanExt.getRowCount()%pageSize==0){
            pageBeanExt.setPageCount(pageBeanExt.getRowCount()/pageSize);
        }else{
            pageBeanExt.setPageCount(pageBeanExt.getRowCount()/pageSize+1);
        }
        if(pageBeanExt.getPageNow()>pageBeanExt.getPageCount()&&pageBeanExt.getPageCount()>0){
            pageBeanExt.setPageNow(pageBeanExt.getPageCount());
        }
        pageBeanExt.setStartLimit(pageBeanExt.getPageNow()*pageSize-pageSize);
        pageBeanExt.setRecordList(orderDao.getAllOrder(pageBeanExt));
        return pageBeanExt;
    }

    @Override
    public Integer getOrderCountByUid(Integer uid) {
        return orderDao.getOrderCountByUid(uid);
    }

    @Override
    public Integer getOrderItemCountByOid(Integer oid) {
        return orderItemService.getOrderItemCountByOid(oid);
    }

    @Override
    public void delOrderByOid(Integer oid) {
        orderDao.delOrderByOid(oid);
    }

    @Override
    public OrderExt getOrderExtByOid(Integer oid) {
        return orderDao.getOrderExtByOid(oid);
    }

    @Override
    public void updateOrder(Order order) {
        orderDao.updateOrder(order);
    }

    @Override
    public void changeOrder(Order order) {
        orderDao.changeOrder(order);
    }

    @Override
    public List<CartItem> shop(Integer oid, Integer[] pid, Integer[] count) {
        List<CartItem> shop = new LinkedList<>();
        for (int i = 0; i < pid.length; i++) {
            CartItem cartItem = new CartItem();
            Product product = productService.getProductByPid(pid[i]);
            cartItem.setProduct(product);
            cartItem.setCount(count[i]);
            shop.add(cartItem);
        }
        return shop;
    }

    @Override
    public Double getTotal(List<CartItem> shop) {
        Double total = 0.0;
        for (int i = 0; i < shop.size(); i++) {
            total += shop.get(i).getSubTotal();
        }
        return total;
    }

    @Override
    public Integer dealShop(Integer oid,List<CartItem> shop, Integer uid) {
        if(oid==null){
            return cartService.dealShop(shop,uid);
        }
        return oid;
    }

    @Override
    public void ship(Integer oid) {
        orderDao.ship(oid);
    }

    @Override
    public void receipt(Integer oid) {
        orderDao.receipt(oid);
    }
}
