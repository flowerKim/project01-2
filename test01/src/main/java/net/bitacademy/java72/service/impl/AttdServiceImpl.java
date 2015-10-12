package net.bitacademy.java72.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.bitacademy.java72.dao.AttdDao;
import net.bitacademy.java72.domain.Attd;
import net.bitacademy.java72.service.AttdService;

@Service
public class AttdServiceImpl implements AttdService {
  @Autowired AttdDao attdDao;
  
  @Override
  public List<Attd> list(String today) {
    return attdDao.list(today);
  }

  @Override
  public List<Attd> get(int memNo) {
    return attdDao.get(memNo);
  }

  @Override
  public Object getToday() {
    return attdDao.getToday();
  }
  
  
  
}