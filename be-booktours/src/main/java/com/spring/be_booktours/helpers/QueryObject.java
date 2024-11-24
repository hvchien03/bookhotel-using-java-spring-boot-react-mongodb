package com.spring.be_booktours.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
// import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QueryObject {
    private String location; // Tỉnh thành đến
    // sort
    private String sortBy;
    private String sortType;
    //Phân trang
    private int page;
    private int limit;
}