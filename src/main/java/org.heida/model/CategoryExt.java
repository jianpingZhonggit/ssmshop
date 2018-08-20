package org.heida.model;

import java.util.List;

public class CategoryExt extends Category{
    private List<CategorySecond> categorySecondList;

    public List<CategorySecond> getCategorySecondList() {
        return categorySecondList;
    }

    public void setCategorySecondList(List<CategorySecond> categorySecondList) {
        this.categorySecondList = categorySecondList;
    }
}
