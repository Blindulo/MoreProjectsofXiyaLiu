package team_random.DBProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import team_random.DBProject.model.*;
import team_random.DBProject.service.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.SimpleFormatter;

@CrossOrigin
@Controller
@RequestMapping(path = "/dbproject/aggregation")
public class AggregationController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private ProductService productService;
    @Autowired
    private RegionService regionService;
    @Autowired
    private StoreService storeService;
    @Autowired
    private HomeCustomerService homeCustomerService;
    @Autowired
    private BusinessCustomerService businessCustomerService;
    @Autowired
    private SalespersonService salespersonService;
    @Autowired
    private StoreManagerService storeManagerService;
    @Autowired
    private RegionManagerService regionManagerService;

    @PostMapping(path = "/checkregister")
    public @ResponseBody
    String checkRegister(@RequestParam(required = false) String name){
        if (businessCustomerService.findByName(name) != null || homeCustomerService.findByName(name) != null
            || salespersonService.findByName(name) != null|| storeManagerService.findByName(name) != null ||
                regionManagerService.findByName(name) != null) return name;
        return null;
    }

    @PostMapping(path = "/showbalance")
    public @ResponseBody
    String showBalance(@RequestParam int customer_id){
        if (businessCustomerService.findById(customer_id) != null){
            BusinessCustomer businessCustomer = businessCustomerService.findById(customer_id);
            return String.valueOf(businessCustomer.getAccount());
        }
        HomeCustomer customer = homeCustomerService.findById(customer_id);
        return String.valueOf(customer.getAccount());
    }

    @PostMapping(path = "/addbalance")
    public @ResponseBody
    String addBalance(@RequestParam int customer_id,@RequestParam int add_balance){
        if (businessCustomerService.findById(customer_id) != null){
            BusinessCustomer customer = businessCustomerService.findById(customer_id);
            customer.setAccount(customer.getAccount()+add_balance);
            businessCustomerService.save(customer);
            return String.valueOf(customer.getAccount());
        }
        HomeCustomer customer = homeCustomerService.findById(customer_id);
        customer.setAccount(customer.getAccount()+add_balance);
        homeCustomerService.save(customer);
        return String.valueOf(customer.getAccount());
    }

    @GetMapping(path = "/showallstores")
    public @ResponseBody
    List<String> showAllStore(){
        return storeService.findAllNames();
    }

    @GetMapping(path = "/showallregions")
    public @ResponseBody
    List<String> showAllRegion(){
        return regionService.findAllNames();
    }

    @PostMapping(path = "/showallproducts")
    public @ResponseBody
    List<Product> showAllProducts(){
        return productService.showAllProducts();
    }

    @PostMapping(path ="/sortallproducts")
    public @ResponseBody
    List<Product> sortAllProductsWithCategory(@RequestParam String search_keyword, @RequestParam String sort_keyword,@RequestParam String category){
        List<Product> ori = productService.sortAllProductsWithCategory(search_keyword,category);
        if (sort_keyword.equals("PriceHighToLow")) {
            ori.sort((o1, o2) -> o2.getPrice() - o1.getPrice());
            return ori;
        }
        else if (sort_keyword.equals("PriceLowToHigh")) {
            ori.sort(Comparator.comparingInt(Product::getPrice));
            return ori;
        }
        return ori;
    }

    @PostMapping(path = "/findbypid")
    public @ResponseBody
    Product findByPid(@RequestParam int pid){
        return productService.findById(pid);
    }

    /**
     *  find order history of specific customer
     * @param customer_id
     * @return
     */
    @PostMapping(path = "/findtransbycid")
    public @ResponseBody
    List<Map<String,String>> findTransByCid(@RequestParam int customer_id){
        List<Transaction> trans= transactionService.findAllByCid(customer_id);
        List<Map<String,String>> res = new ArrayList<>();
        for (Transaction tran: trans){
            Map<String,String> map = new HashMap<>();
            int pid = tran.getProductId();
            int num = tran.getNum();
            Product product = findByPid(pid);
            String picture = product.getPicture();
            int price = product.getPrice();
            String total = String.valueOf(price*num);
            String name = product.getName();
            String date = String.valueOf(tran.getDate());
            map.put("picture",picture);
            map.put("name",name);
            map.put("total",total);
            map.put("date",date);
            res.add(map);
        }
        return res;
    }

    @PostMapping(path = "/orderSearchAndSort/customer")
    public @ResponseBody
    List<Map<String,String>> orderSearchAndSort(@RequestParam int customer_id,@RequestParam String search_keyword,
                                                @RequestParam String sort_keyword){
        List<Map<String,String>> allOrders = findTransByCid(customer_id);
        List<Map<String,String>> res = new ArrayList<>();
        for (Map<String,String> map : allOrders){
            if (!map.get("name").contains(search_keyword)) continue;
            Map<String,String> newMap = new HashMap<>();
            String name = map.get("name");
            String picture = map.get("picture");
            String total = map.get("total");
            String date = map.get("date");
            map.put("picture",picture);
            map.put("name",name);
            map.put("total",total);
            map.put("date",date);
            res.add(map);
        }
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (sort_keyword.equals("total_HighToLow")){
            res.sort( (m1,m2) -> Integer.parseInt(m2.get("total")) - Integer.parseInt(m1.get("total")));
        }
        else if (sort_keyword.equals("total_LowToHigh")){
            res.sort( (m1,m2) -> Integer.parseInt(m1.get("total")) - Integer.parseInt(m2.get("total")));
        }
        else if (sort_keyword.equals("date_MostRecent")){
            res.sort( (m1,m2) -> {
                try {
                    return format.parse(m2.get("date")).compareTo(format.parse(m1.get("date")));
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return 0;
            });
        }
        else if (sort_keyword.equals("date_LeastRecent")){
            res.sort( (m1,m2) -> {
                try {
                    return format.parse(m1.get("date")).compareTo(format.parse(m2.get("date")));
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return 0;
            });
        }
        return res;
    }


    /**
     *
     * @param store_manager_id
     * @return list of map(name,sales, total profits ,inventory, picture
     */
    @PostMapping(path = "/reviewall/storemanager")
    public @ResponseBody
    List<Map<String,String>> reviewAllByStoreManager(@RequestParam int store_manager_id){
        return storeManagerService.reviewAllByStoreManager(store_manager_id);
    }

    @PostMapping(path = "/checkout")
    public @ResponseBody String checkout(@RequestParam int product_id, @RequestParam int customer_id,@RequestParam int counts){
        Product product = productService.findById(product_id);
        int inventory = product.getInventory();
        if (inventory < counts) return "Inventory is not enough, only "+inventory+" remains";
        int total_price = product.getPrice()*counts;
        if (homeCustomerService.findById(customer_id) != null){
            HomeCustomer customer = homeCustomerService.findById(customer_id);
            int rem = customer.getAccount();
            if (rem < total_price) return "Account balance not enough";
            customer.setAccount(rem-total_price);
            homeCustomerService.save(customer);
        }
        else if (businessCustomerService.findById(customer_id) != null){
            BusinessCustomer customer = businessCustomerService.findById(customer_id);
            int rem = customer.getAccount();
            if (rem < total_price) return "Account balance not enough";
            customer.setAccount(rem-total_price);
            businessCustomerService.save(customer);
        }
        Transaction transaction = new Transaction();
        transaction.setCustomerId(customer_id);
        transaction.setProductId(product_id);
        transaction.setNum(counts);
        Date date = new Date();
        transaction.setDate(date);
        transactionService.save(transaction);
        product.setInventory((inventory-counts));
        productService.save(product);
        return String.valueOf(customer_id);
    }

    @PostMapping(path = "/showallproducts/salesperson")
    public @ResponseBody
    List<Product> showProductsOfSalesperson(@RequestParam int id){
        return productService.findBySalespersonId(id);
    }

    @PostMapping(path ="/roughsearch")
    public @ResponseBody
    List<Product> roughSearch(@RequestParam String input){
        return productService.roughSearch(input);
    }

    //Group products by transactions by different category
    @PostMapping(path = "/groupbycategory/all")
    public @ResponseBody
    List<Product> groupByCategory(@RequestParam String category){
        return productService.groupByCategory(category);
        //return productService.sortByCategory;
    }

    //Sort products by selling amount of each product
    @GetMapping(path = "/sortbysales/all")
    public @ResponseBody
    List<Map<String,Integer>> sortBySalesAll(){
        return transactionService.sortBySalesAll();
    }

    //Sort products by total profits of each product
    @PostMapping(path = "/sortbyprofits/all")
    public @ResponseBody
    List<Map<String,Integer>> sortByProfitsAll(){
        return transactionService.sortByProfitsAll();
    }

    //sort transactions by sales in a region
    //return product_name to sales
    @PostMapping(path ="/sortbysales/region")
    public @ResponseBody
    List<Map<String,Integer>> sortBySalesInRegion(@RequestParam int region_id){
        return transactionService.sortBySalesInRegion(region_id);
    }

    //sort transactions by profits in a region
    @PostMapping(path = "/sortbyprofits/region")
    public @ResponseBody
    List<Map<String,Integer>> sortByProfitsInRegion(@RequestParam int region_id){
        return transactionService.sortByProfitsInRegion(region_id);
    }

    //sort transactions by sales in a store
    @PostMapping(path ="/sortbysales/store")
    public @ResponseBody
    List<Map<String,Integer>> sortBySalesInStore(@RequestParam int store_id){
        return transactionService.sortBySalesInStore(store_id);
    }

    //sort transactions by profits in a store
    @GetMapping(path = "/sortbyprofits/store")
    public @ResponseBody
    List<Map<String,Integer>> sortByProfitsInStore(@RequestParam int store_id){
        return transactionService.sortByProfitsInStore(store_id);
    }

}
