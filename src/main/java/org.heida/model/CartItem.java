package org.heida.model;

/**
 * 购物项对象
 */
public class CartItem {
    /**
     * 购物项中具体的商品
     */
    private Product product;

    /**
     * 购物项中商品的数量
     */
    private Integer count;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    /**
     * 根据购物项中商品的单价和购物项中商品的数量计算小计
     * @return 购物项小计
     */
    public Double getSubTotal() {
        return this.product.getShop_price()*this.getCount();
    }
}
