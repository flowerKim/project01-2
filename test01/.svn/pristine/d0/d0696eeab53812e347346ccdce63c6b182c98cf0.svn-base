package net.bitacademy.java72.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.bitacademy.java72.dao.ReplDao;
import net.bitacademy.java72.domain.Repl;
import net.bitacademy.java72.service.ReplService;

@Service
public class ReplServiceImpl implements ReplService {
  @Autowired ReplDao replDao;
  
  @Override
  public List<Repl> list(int pageNo, int pageSize, int no) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    int startIndex = (pageNo - 1) * pageSize;
    if (startIndex < 0) {
      startIndex = 0;
    }
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    paramMap.put("no", no);
    return replDao.list(paramMap);
  }

  @Override
  public int delete(int no) {
    return replDao.delete(no);
  }
  
  @Override
  public int insert(Repl repl) {
    return replDao.insert(repl);
  }

  @Override
  public int update(Repl repl) {
    return replDao.update(repl);
  }

  @Override
  public Repl get(int no) {
    return replDao.get(no);
  }

  @Override
  public Repl getView(int no) {
    return replDao.get(no);
  }

  @Override
  public int updateView(Repl repl) {
    return replDao.updateView(repl);
  }

  @Override
  public int countAll() {
    return replDao.countAll();
  }
  
  
  
  
  
}
