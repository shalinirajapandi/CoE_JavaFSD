package com.myTraining.core.models;

import java.util.List;

public interface BookModel {
    String fetchApi();
    List<String> getBooks();
    String getLoadMoreValue();
    String getLoadMoreCtaName();
}