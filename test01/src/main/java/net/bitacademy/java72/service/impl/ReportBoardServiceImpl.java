package net.bitacademy.java72.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.bitacademy.java72.dao.ReportBoardDao;
import net.bitacademy.java72.domain.ReportBoard;
import net.bitacademy.java72.service.ReportBoardService;


@Service
public class ReportBoardServiceImpl implements ReportBoardService {
  @Autowired ReportBoardDao reportBoardDao;
  
  @Override
  public List<ReportBoard> list(int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    int startIndex = (pageNo - 1) * pageSize;
    if (startIndex < 0) {
      startIndex = 0;
    }
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    return reportBoardDao.list(paramMap);
  }

  @Override
  public int delete(int no) {
    return reportBoardDao.delete(no);
  }
  
  @Override
  public int insert(ReportBoard reportBoard) {
    return reportBoardDao.insert(reportBoard);
  }

  @Override
  public int update(ReportBoard reportBoard) {
    return reportBoardDao.update(reportBoard);
  }

  @Override
  public ReportBoard get(int no) {
    return reportBoardDao.get(no);
  }

  @Override
  public ReportBoard getView(int no) {
    return reportBoardDao.get(no);
  }

  @Override
  public int updateView(ReportBoard reportBoard) {
    return reportBoardDao.updateView(reportBoard);
  }

  @Override
  public int countAll() {
    return reportBoardDao.countAll();
  }
  
  
  
  
  
}
