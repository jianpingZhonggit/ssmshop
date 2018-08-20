package org.heida.model;

/**
 * 二级类目
 * 对应数据库中categorySecond物理表
 */
public class CategorySecond {
    /**
     *二级类目id
     */
    private Integer csid;
    /**
     * 二级类目名称
     */
    private String csname;
    /**
     * 所属一级类目id
     */
    private Integer cid;

    public Integer getCsid() {
        return csid;
    }

    public void setCsid(Integer csid) {
        this.csid = csid;
    }

    public String getCsname() {
        return csname;
    }

    public void setCsname(String csname) {
        this.csname = csname;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    @Override
    public String toString() {
        return "CategorySecond{" +
                "csid=" + csid +
                ", csname='" + csname + '\'' +
                ", cid=" + cid +
                '}';
    }
}
