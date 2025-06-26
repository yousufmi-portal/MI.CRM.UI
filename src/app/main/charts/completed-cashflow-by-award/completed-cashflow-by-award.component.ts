import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

@Component({
  selector: 'app-completed-cashflow-by-award',
  imports: [CommonModule, NgxEchartsDirective],
  providers: [
    provideEchartsCore({
      echarts: () => import('echarts') // cleanest way with auto tree-shaking
    })
  ],
  templateUrl: './completed-cashflow-by-award.component.html',
  styleUrl: './completed-cashflow-by-award.component.scss'
})
export class CompletedCashflowByAwardComponent {
  chartOptions = {
    title: {
      text: 'Completed Cashflow by Award',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: {c}%'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value} %'
      }
    },
    yAxis: {
      type: 'category',
      data: [
        'NR184209000C050',
        'NR207103000C028',
        '24 PA 11081100 380',
        'NR234101000C022',
        'NR243100000C014',
        'NR217103000C017',
        '23 ACECUIA',
        'NR243100000C007'
      ]
    },
    series: [
      {
        name: 'Completed',
        type: 'bar',
        data: [94.33, 91.37, 61.01, 58.97, 36.49, 26.9, 23.0, 23.0],
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%'
        },
        itemStyle: {
          color: '#4CAF50'
        }
      }
    ]
  };
}
