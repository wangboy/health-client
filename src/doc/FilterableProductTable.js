/**
 * Created by wangbo on 2016/12/5.
 */
import React from 'react'
import './Common.css'

class SearchBar extends React.Component {
  render() {
    return ( //TODO
      <form>
        <input type="text"
               value={this.props.text}
               placeholder="input product name"
               onChange={this.props.textChange}/>
        <p>
          <input type="checkbox"
                 checked={this.props.checked}
                 onChange={this.props.checkChange}/>
          {'  '}
          Only show products in stock
        </p>
      </form>
    )
  }
}

class ProductCategory extends React.Component {
  render() {
    return (
      <tr>
        <th>{this.props.category}</th>
      </tr>
    )
  }
}


class ProductItem extends React.Component {
  render() {
    let product = this.props.product
    let name = product.name
    if (product.stocked) {
      name = <span style={{color: 'red'}}>{product.name}</span>
    }
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  render() {
    const search = this.props.search
    const checked = this.props.checked
    let children = []
    let products = this.props.products
      .sort((a, b) => a.category.localeCompare(b.category))
    //.filter( (e) => e.name.toLowerCase().indexOf(search.toLowerCase())  )
    let lastCategory = ""
    products.forEach((product) => {
      if (product.name.toLowerCase().indexOf(search.toLowerCase()) === -1 || (!product.stocked && checked)) {
        return
      }
      if (product.category !== lastCategory) {
        children.push(<ProductCategory category={product.category} key={product.category}/>)
      }
      children.push(<ProductItem product={product} key={product.name}/>)
      lastCategory = product.category
    })

    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {children}
        </tbody>
      </table>
    )
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'}
];

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: "",
      checked: false
    }

    this.handleCheckChange = this.handleCheckChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange(e) {
    console.log(" input text :" + e.target.value)
    this.setState({search: e.target.value})
  }

  handleCheckChange(e) {
    console.log("checked :" + e.target.checked)
    this.setState({checked: e.target.checked}) //??
  }

  render() {
    return (
      <div className="ProductTable">
        <SearchBar
          text={this.state.search}
          checked={this.state.checked}
          textChange={this.handleTextChange}
          checkChange={this.handleCheckChange}/>
        <ProductTable
          products={PRODUCTS}
          search={this.state.search}
          checked={this.state.checked}/>
      </div>
    )
  }
}

FilterableProductTable.propTypes = {
  search: React.PropTypes.string.isRequired
}


export default FilterableProductTable