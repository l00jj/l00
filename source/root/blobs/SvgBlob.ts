
class BlobSvgConfig {
  size: number//svg的最大范围
  boxSize: number//svg视距盒子的范围，用于动画可能的超越
  randomness: number
  complexity: number
  rotate: number//旋转角度
  randoms: number[] = []//计算所得
  constructor(config: any = {}) {
    const { size, randomness, complexity, boxSize, rotate } = config
    this.size = typeof size === "number" && size ? size : 450//生成形状的最大尺寸，直径
    this.randomness = typeof randomness === "number" && randomness ? randomness : 6//各点间随机值的最低值，2~9
    this.complexity = typeof complexity === "number" && complexity ? complexity : 10//形状的节点数
    this.boxSize = typeof boxSize === "number" && boxSize ? boxSize : 500//
    this.rotate = typeof rotate === "number" && rotate ? rotate : 0//
    //
    this.makeRandoms()
  }
  makeRandoms() {
    this.randoms = Array(this.complexity).fill(0).map(() => Math.random())
  }
}


class BlobSvgPoints {
  base: number[][] = []
}

class BlobSvgValue {
  path_d = ''
  polyline_points = ''
}

class BlobSvg {
  config: BlobSvgConfig
  points = new BlobSvgPoints()
  value = new BlobSvgValue()
  constructor(config: any) {
    this.config = new BlobSvgConfig(config)
  }
  makeRandoms() {
    this.config.makeRandoms()
  }
  makeBasePoints() {
    this.points.base = BlobSvg.createBasePoints(this.config)
  }

  getPathD() {
    return BlobSvg.computedPathD(this.points.base)
  }

  getPolylinePoints() {
    return BlobSvg.computedPolylinePoints(this.points.base)
  }

  //通用工具，保留小数点，默认2位
  static toFixed(i: number, n: number = 2) {
    n = 10 ** n
    return Math.round(i * n) / n
  }

  //计算基础点的位置
  static createBasePoints(config: BlobSvgConfig): number[][] {
    const { complexity, randomness, size, boxSize, randoms, rotate } = config
    const centre = boxSize / 2
    const deg = 360 / complexity
    const cornerPoints = Array(complexity).fill(0).map((v, i) => {
      const min = randomness / 10
      const radius = size / 2
      const r = Math.PI * (deg * i + rotate) / 180
      const l = radius * (min + (1 - min) * randoms[i])
      const x = l * Math.cos(r)
      const y = l * Math.sin(r)
      return [BlobSvg.toFixed(centre + x), BlobSvg.toFixed(centre + y)]
    })
    return cornerPoints
  }

  //计算两点的运动后缓动位置
  static createInertiaPoints = (startPoint: number[], endPoint: number[], inertia?: (input: number) => number) => {
    /**
     * 旧方案采用斜率计算，会遇到斜率无限大的情况，且计算较为繁琐
    const abWidthDiff = endPoint[0] - startPoint[0]
    const abHeightDiff = endPoint[1] - startPoint[1]
    const abWidth = Math.abs(abWidthDiff)
    const abHeight = Math.abs(abHeightDiff)
    const abLength = Math.sqrt(abWidth ** 2 + abHeight ** 2)
    //Math.sqrt(abLength) 开方弹较小
    const abInertiaLength = inertia ? inertia(abLength) : abLength / 2
    const ratio = Math.sqrt(abInertiaLength ** 2 / ((1 + abHeight / abWidth) * abWidth ** 2))
    const cX = endPoint[0] + abWidthDiff * ratio
    const cY = endPoint[1] + abHeightDiff * ratio
     */
    const inertiaFun = inertia ? inertia : (abLength: number) => abLength / 2
    const cX = endPoint[0] + inertiaFun(endPoint[0] - startPoint[0])
    const cY = endPoint[1] + inertiaFun(endPoint[1] - startPoint[1])
    return [BlobSvg.toFixed(cX), BlobSvg.toFixed(cY)]
  }

  //根据基础点输出二次贝塞尔曲线值字符串
  static computedPathD(points: number[][]): string {
    const bessel2Points = []
    for (let i = 0, arr = points, len = arr.length; i < len; i++) {
      const start = arr[i]
      const end = i === len - 1 ? arr[0] : arr[i + 1]
      const tangentX = BlobSvg.toFixed((start[0] + end[0]) / 2)
      const tangentY = BlobSvg.toFixed((start[1] + end[1]) / 2)
      bessel2Points.push(start, [tangentX, tangentY])
    }
    //
    const closedPoints = [bessel2Points[bessel2Points.length - 1], ...bessel2Points]
    let string = closedPoints[0].join(',')
    for (let len = Math.floor(closedPoints.length / 2), i = 0, t = 0; i < len; i++, t = i * 2) {
      string += `Q${closedPoints[t + 1].join(',')},${closedPoints[t + 2].join(',')}`
    }
    string = `M${string}Z`
    //
    return string
  }

  //根据基础点输出折线坐标值字符串
  static computedPolylinePoints(points: number[][]): string {
    const string = [...points, points[0]]
      .map(item => item.join(',')).join(' ')
    return string
  }

  //根据两组点输出缓动坐标值字符串
  static computedBlobJellyAnimation(startPoints: number[][], endPoints: number[][]): string {
    //console.log(startPoints, endPoints)
    if (startPoints.length !== endPoints.length) return '';
    //decay//衰退
    //inertiaDistance//惯性距离
    const abJellyDecayPoints = (startPoints: number[][], endPoints: number[][]) =>
      endPoints.map((endPoint, i) => BlobSvg.createInertiaPoints(startPoints[i], endPoint))

    let lastPoints = startPoints

    const jellyDecayPoints = Array(5).fill(0).map((v, i) => {
      const jellyDecayPoints = abJellyDecayPoints(lastPoints, endPoints)
      lastPoints = jellyDecayPoints
      return jellyDecayPoints
    })

    const allPoints = [startPoints, ...jellyDecayPoints, endPoints]

    const allPointsPathD = allPoints.map(points => {
      return BlobSvg.computedPathD(points)
    }).join(';')

    return allPointsPathD
  }

}

export { BlobSvg, BlobSvgConfig }