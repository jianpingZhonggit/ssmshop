package org.heida.model;

/**
 * 一级类目
 * 对应数据库中category物理表
 */
public class Category {
    /**
     * 一级类目id
     */
    private Integer cid;

    /**
     * 一级类目名称
     */
    private String cname;

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    @Override
    public String toString() {
        return "Category{" +
                "cid=" + cid +
                ", cname='" + cname + '\'' +
                '}';
    }
}
