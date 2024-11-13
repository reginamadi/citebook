import React from 'react'
import { connect } from 'react-redux'
import Recent_activity_list from './Recent_activity_list'
import Users_to_follow_list from './Users_to_follow_list'
import Search_Bar from './Search_Bar'
export const Right_sidebar = (props) => {
  return (
    <div style={{"marginTop":"30px","marginRight":"15px","marginLeft":"15px"}}>
    <Recent_activity_list/>
    <Users_to_follow_list />
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Right_sidebar)