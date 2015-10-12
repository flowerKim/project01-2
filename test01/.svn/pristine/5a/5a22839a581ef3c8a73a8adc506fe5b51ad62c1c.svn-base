define(['jquery', 'highcharts', 'app/common'], function($, highcharts) {
	return {
		chartinfo: function() {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
				if (info.state == 'yes') {
					var memNo = info.data.no;
					moduleObj.calc_attd(memNo);
				}
			});
		},
		calc_attd: function(memNo) {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/attd/attdInfo.do?memNo=' + memNo, function(result) {
				var lateCount = 0;
				var absenceCount = 0;
				var nightCount = 0;
				var goodCount = 0;
				var perfectCount = 0;
				for (var i = 0; i < result.data.length; i++) {
					if (result.data[i].checkin_t == 0 || result.data[i].checkout_t == 0) {
						absenceCount++;
					} 
					if (result.data[i].checkin_t == 2 || result.data[i].checkout_t == 2) {
						lateCount++;
					} 
					if (result.data[i].checkout_t == 3) {
						nightCount++;
					}
					if (result.data[i].checkin_t == 1 && result.data[i].checkout_t == 1) {
						goodCount++;
					} else if (result.data[i].checkin_t == 1 && result.data[i].checkout_t == 3) {
						perfectCount++;
						goodCount++;
					}
				}
				var checkinoutArray = [lateCount, absenceCount, nightCount, goodCount, perfectCount];
				moduleObj.highcharts(checkinoutArray);
			});
		},
		highcharts: function(checkinoutArray) {
			console.log(checkinoutArray);
			Highcharts.setOptions({
        colors: ['#ff9900', '#cc0000', '#ffcc00', '#33cc00', '#0099ff']
			});
			$('#chart-container').highcharts({
				chart: {
          type: 'column',
          margin: 75,
          options3d: {
              enabled: true,
              alpha: 20,
              beta: 35,
              depth: 70
          }
      },
      title: {
          text: '출석/입퇴실 현황'
      },
      subtitle: {
          text: null
      },
      plotOptions: {
          column: {
              depth: 45
          },
          series: {
              colorByPoint: true
          }
      },
      xAxis: {
          categories: ['지각/조퇴', '결석', '야자', '개근', '야자+개근']
      },
      yAxis: {
          title: {
              text: null
          },
          allowDecimals: false
      },
      series: [{
          name: '횟수',
          data: [checkinoutArray[0], checkinoutArray[1], checkinoutArray[2], 
                 checkinoutArray[3], checkinoutArray[4]]
      }]
			});
		}
	}
});