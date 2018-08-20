package org.heida.service.impl.impl;

import org.heida.dao.OrderDao;
import org.heida.model.*;
import org.heida.service.impl.CategoryService;
import org.heida.service.impl.OrderItemService;
import org.heida.service.impl.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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

    @Override
    public Integer makeOrder(Double total,Integer uid) {
        Order order = new Order();
        order.setTotal(total);
        order.setState(2);
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
        pageBeanExt.setStartLimit(pageBeanExt.getPageNow()*pageSize-pageSize);
        pageBeanExt.setRowCount(orderDao.getRowCount(pageBeanExt));
        if(pageBeanExt.getRowCount()%pageSize==0){
            pageBeanExt.setPageCount(pageBeanExt.getRowCount()/pageSize);
        }else{
            pageBeanExt.setPageCount(pageBeanExt.getRowCount()/pageSize+1);
        }
        if(pageBeanExt.getPageNow()>pageBeanExt.getPageCount()){
            pageBeanExt.setPageNow(pageBeanExt.getPageCount());
        }
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
}
