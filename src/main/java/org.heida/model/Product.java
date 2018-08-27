package org.heida.model;

import java.util.Date;

/**
 * 商品
 */
public class Product {
    /**
     * 商品id
     */
    private Integer pid;
    /**
     * 商品名称
     */
    private String pname;
    /**
     * 商品市场价
     */
    private Double market_price;
    /**
     * 商品售价
     */
    private Double shop_price;
    /**
     * 商品图片路径
     */
    private String image;
    /**
     * 商品描述
     */
    private String pdesc;
    /**
     * 商品是否热门 1、是,0、不是
     */
    private Integer is_hot;
    /**
     * 商品上架时间
     */
    private Date pdate;
    /**
     * 商品所属二级类目id
     */
    private Integer csid;
    /**
     * 是否下架 0下架 1未下架
     */
    private Integer is_off;

    public Integer getIs_off() {
        return is_off;
    }

    public void setIs_off(Integer is_off) {
        this.is_off = is_off;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public Double getMarket_price() {
        return market_price;
    }

    public void setMarket_price(Double market_price) {
        this.market_price = market_price;
    }

    public Double getShop_price() {
        return shop_price;
    }

    public void setShop_price(Double shop_price) {
        this.shop_price = shop_price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getPdesc() {
        return pdesc;
    }

    public void setPdesc(String pdesc) {
        this.pdesc = pdesc;
    }

    public Integer getIs_hot() {
        return is_hot;
    }

    public void setIs_hot(Integer is_hot) {
        this.is_hot = is_hot;
    }

    public Date getPdate() {
        return pdate;
    }

    public void setPdate(Date pdate) {
        this.pdate = pdate;
    }

    public Integer getCsid() {
        return csid;
    }

    public void setCsid(Integer csid) {
        this.csid = csid;
    }


    @Override
    public String toString() {
        return "Product{" +
                "pid=" + pid +
                ", pname='" + pname + '\'' +
                ", market_price=" + market_price +
                ", shop_price=" + shop_price +
                ", image='" + image + '\'' +
                ", pdesc='" + pdesc + '\'' +
                ", is_hot=" + is_hot +
                ", pdate=" + pdate +
                ", csid=" + csid +
                ", is_off=" + is_off +
                '}';
    }
}
