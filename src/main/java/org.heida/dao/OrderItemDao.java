package org.heida.dao;

import org.heida.model.OrderItem;

import java.util.List;

public interface OrderItemDao {
    void insertOrderItem(OrderItem orderItem);

    Integer getOrderItemCountByOid(Integer oid);

    Integer getOrderItemCountByPid(Integer pid);

    List<OrderItem> getOrderItemListByOid(Integer oid);

    void delOrderItem(Integer itemId);
}
