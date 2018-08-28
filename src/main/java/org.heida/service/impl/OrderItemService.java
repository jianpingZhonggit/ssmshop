package org.heida.service.impl;

import org.heida.model.CartItem;
import org.heida.model.OrderItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderItemService {
    void addOrderItems(List<CartItem> shop, Integer oid);

    Integer getOrderItemCountByOid(Integer oid);

    Integer getOrderItemCountByPid(Integer pid);

    List<OrderItem> getOrderItemListByOid(Integer oid);

    void delOrderItem(Integer itemId);
}
