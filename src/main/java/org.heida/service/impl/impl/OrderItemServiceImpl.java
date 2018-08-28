package org.heida.service.impl.impl;

import org.heida.dao.OrderItemDao;
import org.heida.model.CartItem;
import org.heida.model.OrderItem;
import org.heida.service.impl.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    @Autowired
    private OrderItemDao orderItemDao;

    @Override
    public void addOrderItems(List<CartItem> shop, Integer oid) {
        for (int i = 0; i < shop.size(); i++) {
            OrderItem orderItem = new OrderItem();
            CartItem cartItem = shop.get(i);
            orderItem.setCount(cartItem.getCount());
            orderItem.setOid(oid);
            orderItem.setSubtotal(cartItem.getSubTotal());
            orderItem.setPid(cartItem.getProduct().getPid());
            orderItemDao.insertOrderItem(orderItem);
        }
    }

    @Override
    public Integer getOrderItemCountByOid(Integer oid) {
        return orderItemDao.getOrderItemCountByOid(oid);
    }

    @Override
    public Integer getOrderItemCountByPid(Integer pid) {
        return orderItemDao.getOrderItemCountByPid(pid);
    }

    @Override
    public List<OrderItem> getOrderItemListByOid(Integer oid) {
        return orderItemDao.getOrderItemListByOid(oid);
    }

    @Override
    public void delOrderItem(Integer itemId) {
        orderItemDao.delOrderItem(itemId);
    }
}
