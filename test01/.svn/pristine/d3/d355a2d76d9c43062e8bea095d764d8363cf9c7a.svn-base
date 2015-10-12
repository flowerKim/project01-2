package net.bitacademy.java72.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.bitacademy.java72.dao.NoticeDao;
import net.bitacademy.java72.domain.Notice;
import net.bitacademy.java72.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {
  @Autowired NoticeDao noticeDao;
  
  @Override
  public List<Notice> list(int noticePageNo, int noticePageSize) {
//    public List<Notice> list(int noticePageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    int noticeStartIndex = (noticePageNo - 1) * noticePageSize;
    if (noticeStartIndex < 0) {
      noticeStartIndex = 0;
    }
    paramMap.put("noticeStartIndex", noticeStartIndex);
    paramMap.put("noticePageSize", noticePageSize);
    return noticeDao.list(paramMap);
  }

  @Override
  public int countAll() {
    return noticeDao.countAll();
  }
  
  
  @Override
  public int insert(Notice notice) {
    return noticeDao.insert(notice);
  }

  @Override
  public int update(Notice notice) {
    return noticeDao.update(notice);
  }

  @Override
  public Notice get(int nno) {
    return noticeDao.get(nno);
  }

  @Override
  public int delete(int nno) {
    return noticeDao.delete(nno);
  }
  
//  @Override
//  public Notice getView(int nno) {
//    return noticeDao.getView(nno);
//  }
//
//  @Override
//  public int updateView(Notice notice) {
//    return noticeDao.updateView(notice);
//  }
//

  
  
  
  
}
