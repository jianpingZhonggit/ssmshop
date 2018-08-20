package org.heida.model;

import java.util.List;

/**
 * 封装分页所需参数主要包括:
 * 1.当前页
 * 2.每页显示的记录数
 * 3.总记录数
 * 4.总页数
 * 5.记录起始位置
 * 6.所属一级类目
 * 7.所属二级类目
 * 8.查询的关键字
 * 9.记录集合
 * @param <T> 封装的记录的类型
 */
public class PageBean<T> {
    /**
     * 1.当前页
     */
    private Integer pageNow;
    /**
     *  2.每页显示的记录数
     */
    private Integer pageSize;
    /**
     * 3.总记录数
     */
    private Integer rowCount;
    /**
     * 4.总页数
     */
    private Integer pageCount;
    /**
     * 5.记录起始位置
     */
    private Integer startLimit;
    /**
     * 6.所属一级类目
     */
    private Integer cid;
    /**
     * 7.所属二级类目
     */
    private Integer csid;

    /**
     * 8.查询的关键字
     */
    private String keywords;


    /**
     * 9.记录集合
     */
    private List<T> recordList;
    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public Integer getPageNow() {
        return pageNow;
    }

    public void setPageNow(Integer pageNow) {
        this.pageNow = pageNow;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getRowCount() {
        return rowCount;
    }

    public void setRowCount(Integer rowCount) {
        this.rowCount = rowCount;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public Integer getStartLimit() {
        return startLimit;
    }

    public void setStartLimit(Integer startLimit) {
        this.startLimit = startLimit;
    }

    public List<T> getRecordList() {
        return recordList;
    }

    public void setRecordList(List<T> recordList) {
        this.recordList = recordList;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public Integer getCsid() {
        return csid;
    }

    public void setCsid(Integer csid) {
        this.csid = csid;
    }
}
