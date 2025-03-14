package com.myTraining.core.models.Impl;

import com.myTraining.core.models.BookModel;
import com.myTraining.core.services.CustomConfig;
import com.myTraining.core.services.CustomServiceInt;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Model(adaptables =SlingHttpServletRequest.class , adapters = BookModel.class)
public class BookModelImpl implements BookModel {


    private static final Logger LOG = LoggerFactory.getLogger(BookModelImpl.class);


    @ValueMapValue
    private String loadMoreValue;

    @ValueMapValue
    private String loadMoreCtaName;

    @ValueMapValue
    private List<String> books;

   private  String fetchApi;
   

    //@Reference
    //CustomServiceInt CSI;

    @OSGiService
   CustomServiceInt CSI;
    public List<String> getBooks() {
        if(books!=null){
            return new ArrayList<String>(books);
        }else{
            return Collections.emptyList();
        }
    }

    @PostConstruct
    protected void init() {
        LOG.info("------------inside Author model init method----------------");
      //fetchApi=CSI.getAuthorApi();
        LOG.info("------------fetchApi---------------");

    }


  @Override
    public String fetchApi() {
        return fetchApi;
    }

    public String getLoadMoreValue() {
        return loadMoreValue;
    }

    public String getLoadMoreCtaName() {
        return loadMoreCtaName;
    }
}