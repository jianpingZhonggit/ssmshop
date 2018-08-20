package org.heida.dao;

import org.heida.model.OrderItem;

public interface OrderItemDao {
    void insertOrderItem(OrderItem orderItem);

    Integer getOrderItemCountByOid(Integer oid);

    Integer getOrderItemCountByPid(Integer pid);
}
