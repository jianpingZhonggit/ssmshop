package org.heida.dao;

import org.heida.model.*;

import java.util.List;

public interface OrderDao {
    /**
     * 将获得的oid封装在order对象中
     * @param order
     */
    void insertOrder(Order order);
    List<OrderExt> getOrderList(Order order);
    Integer getRowCount(PageBeanExt pageBeanExt);
    List<OrderExt> getAllOrder(PageBeanExt pageBeanExt);

    Integer getOrderCountByUid(Integer uid);

    void delOrderByOid(Integer oid);

    OrderExt getOrderExtByOid(Integer oid);

    void updateOrder(Order order);
}
