import { Stat } from '../../models/shared/stat';
import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-strategic-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './strategic-balance.html',
  styleUrl: './strategic-balance.css'
})
export class StrategicBalance implements OnChanges {
  @Input() stats: Stat[] = [];
  @Input() name: string = '';
  @Input() isDetailView: boolean = false;
  @ViewChild('chartCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;

  average = 0;

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.stats.length > 0) {
      const total = this.stats.reduce((sum, stat) => {
        const numericValue = typeof stat.value === 'number' ? stat.value : 0;
        return sum + numericValue;
      }, 0);
      this.average = total / this.stats.length;
    } else {
      this.average = 0;
    }

    const labels = this.stats.map(stat => stat.label);
    const data = this.stats.map(stat =>
      typeof stat.value === 'number' ? stat.value : 0
    );
    const backgroundColor = this.stats.map((_, i) => i % 2 === 0 ? '#DB8C2B' : '#040404');
    const borderColor = backgroundColor;

    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: this.name,
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
          barThickness: 25,
          borderRadius: 5,
          borderSkipped: false,
          barPercentage: 0.95,
          categoryPercentage: 1.0,
          clip: false
        }]
      },
      options: {
        layout: {
          padding: { left: 20, right: 42 }
        },
        responsive: true,
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { display: false },
            offset: false,
            clip: false
          },
          y: {
            grid: { display: false },
            border: { display: false },
            ticks: { display: false },
            offset: false,
            clip: false,
            min: 0,
            max: 100,
            grace: '5%'
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
  }
}

// Plugin para rotar etiquetas y valores encima de cada barra
Chart.register({
  id: 'verticalLabelPlugin',
  afterDatasetsDraw(chart) {
    const { ctx, data, chartArea } = chart;
    const labels = data.labels as string[] ?? [];
    const values = chart.data.datasets[0].data;
    const metas = chart.getDatasetMeta(0).data;

    ctx.save();
    ctx.font = '600 18px Segoe UI';
    ctx.fillStyle = '#64748B';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    labels.forEach((label, index) => {
      const bar = metas[index] as any;
      const x = bar.x;
      const y = bar.y;
      const value = typeof values[index] === 'number' ? values[index] : '';

      const centerX = x + bar.width / 2;

      // 🔹 Texto rotado debajo de la barra
      ctx.save();
      ctx.translate(centerX + 10, chartArea.bottom - 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(label, 0, 0);
      ctx.restore();

      // 🔹 Texto rotado sobre la punta superior
      ctx.save();
      ctx.translate(centerX + 10, y + 25);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(value.toString(), 0, 0);
      ctx.restore();
    });

    ctx.restore();
  }
});