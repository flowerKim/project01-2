package net.bitacademy.java72.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import net.bitacademy.java72.dao.JobBoardDao;

import net.bitacademy.java72.domain.JobBoard;
import net.bitacademy.java72.service.JobBoardService;

@Service
public class JobBoardServiceImpl implements JobBoardService {
  @Autowired JobBoardDao jobBoardDao;
  
  @Override
  public List<JobBoard> list(int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    int startIndex = (pageNo - 1) * pageSize;
    if (startIndex < 0) {
      startIndex = 0;
    }
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    return jobBoardDao.list(paramMap);
  }

  @Override
  public int delete(int no) {
    return jobBoardDao.delete(no);
  }
  
  @Override
  public int insert(JobBoard jobBoard) {
    return jobBoardDao.insert(jobBoard);
  }

  @Override
  public int update(JobBoard jobBoard) {
    return jobBoardDao.update(jobBoard);
  }

  @Override
  public JobBoard get(int no) {
    return jobBoardDao.get(no);
  }

  @Override
  public JobBoard getView(int no) {
    return jobBoardDao.get(no);
  }

  @Override
  public int updateView(JobBoard jobBoard) {
    return jobBoardDao.updateView(jobBoard);
  }

  @Override
  public int countAll() {
    return jobBoardDao.countAll();
  }
  
  
  
  
  
}
