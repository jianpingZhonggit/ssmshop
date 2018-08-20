package org.heida.service.impl;

import org.heida.model.CartItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderItemService {
    void addOrderItems(List<CartItem> shop, Integer oid);

    Integer getOrderItemCountByOid(Integer oid);

    Integer getOrderItemCountByPid(Integer pid);
}
