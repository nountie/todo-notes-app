<template>
  <table :class="{'table--loading': isLoading}" class="table">
    <thead class="table__header header">
      <tr class="header__row">
        <th class="header__cell"
          v-for="(header, index) in headers"
          :key="header"
          :class="cols[index]"
        >
          <slot :name="`th-${cols[index]}`" :value="header">
            {{ header }}
          </slot>
          <button @click="changeSort(cols[index])" :class="sortBy === cols[index] && sortType" class="header__sort-btn">
            <ArrowIcon class="arrow arrow--up" />
            <ArrowIcon class="arrow arrow--down" />
          </button>
        </th>
      </tr>
    </thead>
    <tbody v-if="rows.length">
      <CRow
        v-for="row in computedRows"
        :key="row.id"
      >
        <CCell v-for="col in cols" :key="`${row.id}-${col}`" :class="`${col}-${row.id}`">
          <slot :name="col" :value="row[col]" :rowId="row.id">
            {{ row[col] }}
          </slot>
        </CCell>
      </CRow>
    </tbody>
    <tr v-else>
      <td :colspan="cols.length" class="no-data">
        <div class="table__free-space">
          <SpinnerIcon v-if="isLoading" />
          <slot v-else name="empty" />
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import CRow from './CRow'
import CCell from './CCell'
import ArrowIcon from '@/assets/icons/arrow.svg'
import SpinnerIcon from '@/assets/icons/spinner.svg'

export default {
  components: {
    CRow,
    CCell,
    ArrowIcon,
    SpinnerIcon
  },
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    headers: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      sortTypeIndex: 0,
      sortBy: ''
    }
  },
  computed: {
    sortTypes () {
      return ['', 'asc', 'desc']
    },
    sortType () {
      return this.sortTypes[this.sortTypeIndex]
    },
    cols () {
      return this.headers.map(header => header.toLowerCase())
    },
    computedRows () {
      return this.sortType ? this[this.sortType] : this.rows
    },
    asc () {
      if (!this.sortBy || !this.sortTypeIndex) {
        return []
      }
      const toSort = [...this.rows]

      if (typeof toSort[0][this.sortBy] === 'number') {
        return toSort.sort((a, b) => a[this.sortBy] - b[this.sortBy])
      }
      return toSort.sort((a, b) => a[this.sortBy].toLowerCase() > b[this.sortBy].toLowerCase() ? 1 : -1)
    },
    desc () {
      const asc = [...this.asc]
      return asc.reverse()
    }
  },
  methods: {
    changeSort (orderBy) {
      if (this.sortBy === orderBy) {
        this.sortTypeIndex = this.sortTypeIndex === 2 ? 0 : this.sortTypeIndex + 1
      } else {
        this.sortBy = orderBy
        this.sortTypeIndex = 1
      }
    }
  }
}
</script>

<style lang="scss">
  .table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    background: #fff;
    margin-bottom: 1rem;
    &__free-space {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      text-align: center;
      font-size: 24px;
      color: #999;
      font-weight: 300;
      letter-spacing: 0.5px;
      padding: 45px 20px;
      svg {
        width: 32px;
        height: 32px;
        animation: rotate 0.75s linear infinite;
      }
    }
    &--loading {
      .header__sort-btn {
        pointer-events: none;
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .header {
    &__row {
      background: #989898;
      color: #fff;
      text-align: left;
      height: 36px;
    }
    &__sort-btn {
      width: 32px;
      height: 27px;
      padding-left: 14px;
      border: none;
      background: none;
      outline: none;
      cursor: pointer;
      margin-left: 5px;
      position: absolute;
      right: 0px;
      top: 4px;

      span {
        transform: rotate(-90deg) translate(-5px, 0);
        &::after {
          content: '';
          transform: rotate(45deg) translate(0, -5px);
        }
      }
      .arrow {
        width: 9px;
        opacity: .5;
        &--up {
          margin-top: 4px;
        }
        &--down {
          transform: rotate(180deg);
          position: relative;
          bottom: 5px;
        }
      }

      &.asc {
        .arrow--up {
          opacity: 1;
        }
      }
      &.desc {
        .arrow--down {
          opacity: 1;
        }
      }
    }
    &__cell {
      padding: 0 1rem;
      font-weight: 400;
      line-height: 1.5;
      border-right: 1px solid #ddd;
      font-size: 14px;
      position: relative;
      &.status {
        width: 16%;
      }
      &.content {
        width: 34%;
      }
    }
  }
</style>
